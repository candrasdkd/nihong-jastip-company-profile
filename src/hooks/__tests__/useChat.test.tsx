import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useChat } from '../useChat';

describe('useChat', () => {
  beforeEach(() => {
    // Reset dan mock global fetch agar tidak melakukan request HTTP asli selama unit testing
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Bersihkan semua mocks setelah setiap test case selesai agar tidak mencemari test lain
    jest.clearAllMocks();
  });

  // PENJELASAN TEST 1:
  // Memastikan saat komponen pertama kali dirender (di-load), state-state awalnya
  // sudah sesuai. Misalnya: chat window tertutup, input kosong, tidak sedang ngetik,
  // dan bot secara otomatis sudah mengirim 1 pesan sapaan awal (greeting message).
  it('initializes with default values and greeting message', () => {
    const { result } = renderHook(() => useChat('id'));

    expect(result.current.isOpen).toBe(false); // Default: chat tertutup
    expect(result.current.inputValue).toBe(''); // Default: input text kosong
    expect(result.current.isTyping).toBe(false); // Default: bot tidak sedang mengetik
    expect(result.current.messages).toHaveLength(1); // Harus ada 1 pesan otomatis
    expect(result.current.messages[0].sender).toBe('bot'); // Pengirim pesan pertama adalah 'bot'
  });

  // PENJELASAN TEST 2:
  // Memastikan fungsi `setIsOpen` berfungsi dengan baik saat dipanggil,
  // yaitu mengubah state `isOpen` dari false menjadi true.
  it('toggles chat open state', () => {
    const { result } = renderHook(() => useChat('id'));

    act(() => {
      // Mensimulasikan klik untuk membuka chat window
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true); // Memastikan state sudah berubah menjadi terbuka
  });

  // PENJELASAN TEST 3:
  // Test skenario paling lengkap (Happy Path).
  // Memastikan bot bisa mengirim pesan user, menerima response JSON dari server, 
  // menampilkan animasi "typing" delay, lalu merender pesan balasan dari API dengan benar.
  it('handles sending a message and receiving a reply', async () => {
    // 1. Siapkan mock fetch agar seolah-olah server merespon dengan sukses (status ok: true)
    // dan mengirimkan pesan "This is a mocked reply".
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'This is a mocked reply' })
    });
    
    // 2. Mock fungsi setTimeout agar delay (2.5 detik) di useChat bisa dieksekusi instan tanpa menunggu beneran
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      if (typeof cb === 'function') cb();
      return 1 as any;
    });

    // 3. Mock fungsi setInterval agar efek animasi ketik karakter (typewriter) langsung selesai
    const setIntervalSpy = jest.spyOn(global, 'setInterval').mockImplementation((cb) => {
      if (typeof cb === 'function') {
        for(let i=0; i<200; i++) cb(); // loop berkali-kali untuk simulasi ketik tiap huruf 
      }
      return 1 as any;
    });

    const { result } = renderHook(() => useChat('id'));

    // 4. Mensimulasikan user mengetik 'Hello bot' di input box
    act(() => {
      result.current.setInputValue('Hello bot');
    });

    // 5. Mensimulasikan user menekan tombol "Kirim"
    await act(async () => {
      await result.current.handleSend();
    });

    // 6. Validasi hasil akhir: Input box kosong, loading berhenti, pesan bot muncul di history
    expect(result.current.inputValue).toBe(''); // Kolom input harus ter-reset
    expect(result.current.isTyping).toBe(false); // Animasi loading dari bot harusnya berhenti karena setTimeout udah instan
    expect(result.current.messages[2].text).toBe('This is a mocked reply'); // Pesan ke-3 di history adalah respon API
    
    // Kembalikan fungsi timeout aslinya agar tak mengganggu test lain
    setTimeoutSpy.mockRestore();
    setIntervalSpy.mockRestore();
  });

  // PENJELASAN TEST 4:
  // Memastikan sistem bisa merespon secara mandiri jika API sedang down atau error (Error Handling Path).
  // Bot harus tetap mengirim pesan fallback (misalnya: "Maaf terjadi kesalahan").
  it('handles API errors gracefully', async () => {
    // 1. Simulasikan fetch ke server gagal/ditolak dengan Error
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    // 2. Mocking timeout/interval lagi agar tak buang waktu test menunggu
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      if (typeof cb === 'function') cb();
      return 1 as any;
    });

    const setIntervalSpy = jest.spyOn(global, 'setInterval').mockImplementation((cb) => {
      if (typeof cb === 'function') {
        for(let i=0; i<200; i++) cb();
      }
      return 1 as any;
    });

    const { result } = renderHook(() => useChat('id'));

    act(() => {
      result.current.setInputValue('trigger error');
    });

    await act(async () => {
      await result.current.handleSend();
    });

    // 3. Pastikan meski fetch Error, bot tetap berhenti mengetik dan merender pesan fallback dari bot sendiri
    expect(result.current.isTyping).toBe(false);
    expect(result.current.messages[2].sender).toBe('bot'); // History pesan ke-3 haruslah dari bot (pesan error fallback)
    
    setTimeoutSpy.mockRestore();
    setIntervalSpy.mockRestore();
  });
});
