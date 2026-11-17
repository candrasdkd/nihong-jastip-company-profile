"use client";

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Ban, CheckCircle2, MessageCircle, Plus, SearchCheck, TriangleAlert, X } from 'lucide-react';

import { Language } from '../../types';
import { useJpyRate } from '../../hooks/useJpyRate';
import { checkItem, ItemStatus } from '../../utils/itemCheck';
import { openWhatsApp } from '../../utils/whatsapp';

interface Row {
  id: number;
  name: string; // link atau nama barang
  price: string; // harga satuan dalam yen (opsional)
  qty: number;
  note: string;
}

const MAX_ROWS = 15;
let nextId = 1;
const newRow = (): Row => ({ id: nextId++, name: '', price: '', qty: 1, note: '' });

const OrderBuilder: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = (id: string, en: string, jp: string) => (lang === 'id' ? id : lang === 'en' ? en : jp);
  const { rate, live } = useJpyRate();

  const [rows, setRows] = useState<Row[]>(() => [newRow()]);
  const [query, setQuery] = useState('');

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const remove = (id: number) => setRows((rs) => (rs.length === 1 ? [newRow()] : rs.filter((r) => r.id !== id)));
  const add = () => setRows((rs) => (rs.length >= MAX_ROWS ? rs : [...rs, newRow()]));

  const filled = rows.filter((r) => r.name.trim());
  const statuses = useMemo(() => new Map(rows.map((r) => [r.id, checkItem(r.name)] as const)), [rows]);
  const hasProhibited = filled.some((r) => statuses.get(r.id) === 'prohibited');
  const hasSpecial = filled.some((r) => statuses.get(r.id) === 'special');

  const subtotalYen = filled.reduce((sum, r) => sum + (parseFloat(r.price) || 0) * Math.max(1, r.qty), 0);
  const pricedCount = filled.filter((r) => parseFloat(r.price) > 0).length;
  const fmtYen = (n: number) => `¥${Math.round(n).toLocaleString('en-US')}`;
  const fmtRp = (n: number) => `Rp ${(Math.round(n / 1000) * 1000).toLocaleString('id-ID')}`;

  const send = () => {
    if (!filled.length || hasProhibited) return;
    const lines = filled.map((r, i) => {
      const price = parseFloat(r.price) > 0 ? ` | ${fmtYen(parseFloat(r.price))}` : '';
      const note = r.note.trim() ? ` | ${r.note.trim()}` : '';
      return `${i + 1}. ${r.name.trim()} | x${Math.max(1, r.qty)}${price}${note}`;
    });
    const sum = pricedCount
      ? t(`Perkiraan harga barang: ${fmtYen(subtotalYen)} (≈ ${fmtRp(subtotalYen * rate)})`, `Estimated item total: ${fmtYen(subtotalYen)} (≈ ${fmtRp(subtotalYen * rate)})`, `商品代金の目安: ${fmtYen(subtotalYen)}（≈ ${fmtRp(subtotalYen * rate)}）`)
      : '';
    const ask = t(
      'Mohon info fee titip beli, ongkos handcarry, dan jadwal flight terdekat ya.',
      'Please share the buy-for-me fee, the handcarry cost, and the nearest flight schedule.',
      '買い付け手数料、ハンドキャリー料金、直近のフライト予定を教えてください。'
    );
    const head = t('Halo Nihong Jastip, saya mau titip beli:', 'Hello Nihong Jastip, I would like to order (buy-for-me):', 'Nihong Jastipさん、買い付け代行を依頼したいです:');
    openWhatsApp([head, '', ...lines, '', sum, ask].filter((x, i, a) => x !== '' || a[i - 1] !== '').join('\n'));
  };

  // ---------- Pengecek barang ----------
  const status: ItemStatus | null = query.trim() ? checkItem(query) : null;
  const verdict = {
    prohibited: {
      icon: Ban,
      title: t('Tidak bisa dititip', 'Cannot be carried', '預かれません'),
      text: t('Barang ini termasuk kategori terlarang (narkoba, senjata, bahan mudah meledak, aerosol, hewan hidup, tanaman, barang ilegal).', 'This falls under prohibited items (drugs, weapons, explosives, aerosols, live animals, plants, illegal goods).', 'この品目は禁止品（麻薬・武器・爆発物・エアゾール・生きた動物・植物・違法品）に該当します。'),
    },
    special: {
      icon: TriangleAlert,
      title: t('Bisa, tapi harga khusus', 'Possible, special pricing', '可能・特別料金'),
      text: t('Sepatu, figure, elektronik, dan barang bulky tidak memakai tarif per kg biasa. Harganya dikonfirmasi admin.', 'Shoes, figures, electronics, and bulky items are not on the regular per-kg rate. Our admin confirms the price.', '靴・フィギュア・電化製品・かさばる荷物は通常のkg単価ではありません。料金は担当者がご案内します。'),
    },
    ok: {
      icon: CheckCircle2,
      title: t('Umumnya bisa dititip', 'Generally OK to carry', '一般的に預かり可能'),
      text: t('Tidak termasuk daftar terlarang atau harga khusus yang kami ketahui. Admin tetap mengonfirmasi sebelum diproses.', 'Not on our prohibited or special-price lists. Our admin still confirms before processing.', '禁止品・特別料金のリストには該当しません。処理前に担当者が確認します。'),
    },
  };
  const v = status ? verdict[status] : null;

  const askAdminAbout = () =>
    openWhatsApp(t(`Halo Nihong Jastip, boleh tanya soal barang ini: ${query.trim()}`, `Hello Nihong Jastip, may I ask about this item: ${query.trim()}`, `Nihong Jastipさん、この商品について質問です: ${query.trim()}`));

  return (
    <section id="order" className="order">
      <div className="container">
        <motion.div
          className="section-heading split-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <span className="eyebrow">{t('Titip beli', 'Buy-for-me', '買い付け代行')}</span>
            <h2>{t('Susun daftar belanja, kirim sekali jalan.', 'Build your shopping list, send it once.', '買い物リストを作って、まとめて送信。')}</h2>
          </div>
          <p>{t('Tempel link Mercari atau Amazon, isi jumlah dan harga, lalu semuanya terkirim rapi ke WhatsApp admin.', 'Paste Mercari or Amazon links, add quantity and price, and it all goes to our admin on WhatsApp in one tidy message.', 'MercariやAmazonのリンクを貼り、数量と価格を入力すると、WhatsAppにまとめて送信されます。')}</p>
        </motion.div>

        <div className="order-grid">
          <motion.div className="order-card" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.4 }}>
            <div className="order-rows">
              {rows.map((r, i) => {
                const st = statuses.get(r.id);
                return (
                  <div key={r.id} className={`order-row ${r.name.trim() && st !== 'ok' ? st : ''}`}>
                    <span className="order-num">{i + 1}</span>
                    <div className="order-fields">
                      <input
                        className="order-name"
                        value={r.name}
                        onChange={(e) => update(r.id, { name: e.target.value })}
                        placeholder={t('Link atau nama barang', 'Item link or name', '商品リンクまたは商品名')}
                        aria-label={t(`Barang ${i + 1}: link atau nama`, `Item ${i + 1}: link or name`, `商品${i + 1}: リンクまたは名前`)}
                      />
                      <div className="order-mini">
                        <label>
                          <span>{t('Jumlah', 'Qty', '数量')}</span>
                          <input type="number" min={1} max={99} value={r.qty} onChange={(e) => update(r.id, { qty: Math.max(1, Math.min(99, Number(e.target.value) || 1)) })} />
                        </label>
                        <label>
                          <span>{t('Harga satuan (¥)', 'Unit price (¥)', '単価（¥）')}</span>
                          <input type="number" min={0} inputMode="numeric" value={r.price} placeholder="0" onChange={(e) => update(r.id, { price: e.target.value })} />
                        </label>
                        <label className="order-note">
                          <span>{t('Catatan', 'Note', 'メモ')}</span>
                          <input value={r.note} maxLength={80} onChange={(e) => update(r.id, { note: e.target.value })} placeholder={t('ukuran, warna…', 'size, colour…', 'サイズ・色…')} />
                        </label>
                      </div>
                      {r.name.trim() && st === 'prohibited' && <p className="order-flag danger"><Ban size={14} /> {t('Barang terlarang, tidak bisa dititip', 'Prohibited item, cannot be carried', '禁止品のため預かれません')}</p>}
                      {r.name.trim() && st === 'special' && <p className="order-flag warn"><TriangleAlert size={14} /> {t('Harga khusus, dikonfirmasi admin', 'Special pricing, confirmed by admin', '特別料金・担当者が確認')}</p>}
                    </div>
                    <button type="button" className="order-remove" onClick={() => remove(r.id)} aria-label={t(`Hapus barang ${i + 1}`, `Remove item ${i + 1}`, `商品${i + 1}を削除`)}><X size={16} /></button>
                  </div>
                );
              })}
            </div>

            <button type="button" className="order-add" onClick={add} disabled={rows.length >= MAX_ROWS}>
              <Plus size={16} /> {t('Tambah barang', 'Add item', '商品を追加')}
            </button>

            <div className="order-summary" aria-live="polite">
              <div>
                <span className="order-sum-label">{t('Perkiraan harga barang', 'Estimated item total', '商品代金の目安')}</span>
                {pricedCount ? (
                  <>
                    <strong>{fmtYen(subtotalYen)}</strong>
                    <span className="order-sum-rp">≈ {fmtRp(subtotalYen * rate)} <small className={live ? 'on' : ''}>{live ? t('kurs live', 'live rate', 'ライブレート') : t('kurs perkiraan', 'approx. rate', '目安レート')}</small></span>
                  </>
                ) : (
                  <span className="order-sum-empty">{t('Isi harga satuan untuk melihat total (opsional)', 'Add unit prices to see a total (optional)', '単価を入力すると合計が表示されます（任意）')}</span>
                )}
              </div>
              <button type="button" className="order-send" onClick={send} disabled={!filled.length || hasProhibited}>
                <MessageCircle size={18} /> {t('Kirim daftar ke WhatsApp', 'Send list on WhatsApp', 'リストをWhatsAppで送る')}
              </button>
            </div>

            <ul className="order-notes">
              {hasProhibited && <li className="danger">{t('Hapus barang terlarang dulu sebelum mengirim.', 'Remove the prohibited item(s) before sending.', '送信前に禁止品を削除してください。')}</li>}
              {hasSpecial && !hasProhibited && <li>{t('Ada barang berharga khusus: ongkosnya dikonfirmasi admin, tidak masuk hitungan kalkulator per kg.', 'Some items have special pricing: our admin confirms the cost, it is not part of the per-kg calculator.', '特別料金の商品があります。送料は担当者が確認します（kg単価の計算対象外）。')}</li>}
              <li>{t('Belum termasuk fee titip beli (bisa nego) dan ongkos handcarry. Hitung ongkos di kalkulator di atas.', 'Excludes the buy-for-me fee (negotiable) and handcarry cost. Estimate the cost in the calculator above.', '買い付け手数料（交渉可）とハンドキャリー料金は含まれません。上の計算機で送料をご確認ください。')}</li>
              <li>{t('DP 50% di awal untuk titip beli (kecuali kesepakatan khusus).', '50% down payment upfront for buy-for-me (unless agreed otherwise).', '買い付けは前払い50％（別途合意がある場合を除く）。')}</li>
            </ul>
          </motion.div>

          <motion.aside className="checker" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.4, delay: 0.08 }}>
            <span className="checker-icon"><SearchCheck size={22} /></span>
            <h3>{t('Cek barangmu dulu', 'Check your item first', 'まず商品をチェック')}</h3>
            <p>{t('Ketik nama barang, kami cek boleh dititip atau tidak.', 'Type an item name and we check if it can be carried.', '商品名を入力すると、預かれるか確認できます。')}</p>
            <input
              className="checker-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('contoh: parfum semprot, hoodie…', 'e.g. perfume spray, hoodie…', '例：スプレー、パーカー…')}
              aria-label={t('Nama barang yang ingin dicek', 'Item name to check', 'チェックする商品名')}
            />
            {v && status && (
              <div className={`checker-result ${status}`} role="status">
                <strong><v.icon size={18} /> {v.title}</strong>
                <span>{v.text}</span>
                {status !== 'prohibited' && (
                  <button type="button" onClick={askAdminAbout}>{t('Tanya admin soal barang ini', 'Ask admin about this item', 'この商品について質問')}</button>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default OrderBuilder;
