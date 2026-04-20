import { renderHook, act } from '@testing-library/react';
import { useAppLogic } from '../useAppLogic';

// Mock IntersectionObserver karena API ini berjalan di Browser namun tidak ada di lingkungan JSDOM (testing)
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('useAppLogic', () => {
  let openSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock fungsi window.open agar test tidak membuka tab browser sungguhan
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    // Bersihkan fungsi spy setelah dipakai agar tidak bocor ke test berikutnya
    openSpy.mockRestore();
    jest.clearAllMocks();
  });

  // PENJELASAN TEST 1:
  // Memastikan hooks diinisialisasi dengan state standar yang benar.
  // Tab layanan "jastip" harus aktif pertama kali, tak ada FAQ terbuka, dan menu saat ini adalah "home".
  it('initializes with default values', () => {
    const { result } = renderHook(() => useAppLogic('id'));

    expect(result.current.activeTab).toBe('jastip');
    expect(result.current.activeFaqs).toEqual([]);
    expect(result.current.activeMenu).toBe('home');
    expect(result.current.sidebarOpen).toBe(false);
  });

  // PENJELASAN TEST 2:
  // Memastikan tombol hamburger / fungsi pembuka tutup sidebar menu (mobile navigation) bekerja normal.
  it('toggles sidebar correctly', () => {
    const { result } = renderHook(() => useAppLogic('id'));

    act(() => {
      // Panggil aksi klik sidebar untuk pertama kali (Buka)
      result.current.toggleSidebar();
    });
    expect(result.current.sidebarOpen).toBe(true); // Harus true

    act(() => {
      // Panggil fungsi lagi (Tutup)
      result.current.toggleSidebar();
    });
    expect(result.current.sidebarOpen).toBe(false); // Harus false
  });

  // PENJELASAN TEST 3:
  // Memastikan bahwa sistem Accordion / FAQ bisa dibuka dan ditutup berdasarkan indeks FAQ-nya.
  // Serta memastikan dua FAQ berbeda bisa terbuka bersamaan (multi-open).
  it('toggles FAQ correctly', () => {
    const { result } = renderHook(() => useAppLogic('id'));

    // Buka FAQ ke-1
    act(() => {
      result.current.toggleFaq(1);
    });
    expect(result.current.activeFaqs).toContain(1);

    // Buka FAQ ke-2 (Sementara FAQ ke-1 harusnya tetap terbuka)
    act(() => {
      result.current.toggleFaq(2);
    });
    expect(result.current.activeFaqs).toContain(1);
    expect(result.current.activeFaqs).toContain(2);

    // Tutup FAQ ke-1 saja
    act(() => {
      result.current.toggleFaq(1);
    });
    expect(result.current.activeFaqs).not.toContain(1); // FAQ 1 hilang dari list
    expect(result.current.activeFaqs).toContain(2); // FAQ 2 masih ada
  });

  // PENJELASAN TEST 4:
  // Mengecek fungsi Smooth Scrolling di Navigasi menu utama atas. 
  // Saat diklik menu (misal: Services), halaman akan otomatis pindah, merubah active menu, dan melakukan event.preventDefault
  it('handles navigation click correctly', () => {
    const { result } = renderHook(() => useAppLogic('id'));
    const mockEvent = { preventDefault: jest.fn() } as unknown as React.MouseEvent<HTMLAnchorElement>;

    // Mock document.getElementById dan perilaku scrollIntoView yang akan digerakkan halamannya
    const mockScrollIntoView = jest.fn();
    jest.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: mockScrollIntoView
    } as unknown as HTMLElement);

    act(() => {
      result.current.handleNavClick('services')(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled(); // Cegah halaman reload (default behavior anchor link)
    expect(result.current.activeMenu).toBe('services'); // State menu berubah ke menu target
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' }); // API Scroll dieksekusi browser secara mulus
  });

  // PENJELASAN TEST 5:
  // Mengecek integrasi fungsi form pengiriman Pesan (di bagian Contact) yang harus mengubah
  // isian User (Nama, Pesan) menjadi format link URL WhatsApp dan membuka tab WA baru.
  it('handles WhatsApp contact form submission', () => {
    const { result } = renderHook(() => useAppLogic('id'));
    const mockReset = jest.fn();
    const mockEvent = {
      preventDefault: jest.fn(),
      currentTarget: {
        reset: mockReset,
      }
    } as unknown as React.FormEvent<HTMLFormElement>;

    // Mock FormData agar form me-return value simulasi (Nama: John Doe, dsb)
    global.FormData = jest.fn().mockImplementation(() => ({
      get: (key: string) => {
        if (key === 'name') return 'John Doe';
        if (key === 'phone') return '08123456789';
        if (key === 'message') return 'Hello World';
        return '';
      }
    }));

    act(() => {
      result.current.submitContactToWhatsApp(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(openSpy).toHaveBeenCalled(); // window.open harus terpanggil untuk buka WA Web
    expect(openSpy.mock.calls[0][0]).toContain('John%20Doe'); // Parameter URL WA harus me-render "John Doe" URL Encoded
    expect(mockReset).toHaveBeenCalled(); // Form input harus terhapus/reset sesudah berhasil dikirim
  });
});
