import { render, screen, fireEvent } from '@testing-library/react';
import ChatBot from '../ChatBot';
import { useChat } from '../../../hooks/useChat';

// PENJELASAN MOCKING:
// Kita menggunakan jest.mock untuk memalsukan perilaku Custom Hook 'useChat'.
// Mengapa? Karena kita sedang melakukan UNIT TEST pada komponen ChatBot secara terisolasi.
// Kita tidak ingin mengetes logika API atau Timer di dalam hook-nya (karena itu sudah dites di useChat.test.tsx),
// kita hanya ingin mengetes: "Jika Hook memberikan data X, apakah UI merender tampilan Y?"
jest.mock('../../../hooks/useChat');

const mockUseChat = useChat as jest.Mock;

describe('ChatBot Component', () => {
  // Data standar (default) yang akan dikembalikan oleh Mock Hook
  const defaultChatData = {
    isOpen: false,
    setIsOpen: jest.fn(),
    messages: [{ id: '1', text: 'Halo!', sender: 'bot', timestamp: new Date() }],
    inputValue: '',
    setInputValue: jest.fn(),
    isTyping: false,
    streamingText: '',
    messagesEndRef: { current: null },
    handleSend: jest.fn(),
    chatData: {
      title: 'Nihong AI',
      placeholder: 'Tanya sesuatu...',
      send: 'Kirim'
    }
  };

  beforeEach(() => {
    // Reset semua mock agar tidak ada riwayat panggil dari test sebelumnya
    jest.clearAllMocks();
    // Default-nya, hook akan mengembalikan data dasar (chat tertutup)
    mockUseChat.mockReturnValue(defaultChatData);
  });

  // PENJELASAN TEST 1:
  // Memastikan bahwa saat aplikasi pertama kali dimuat, tombol bundar Chatbot
  // (floating button) muncul di pojok layar. Kita mencarinya menggunakan Role 'button'.
  it('renders the floating chat button', () => {
    render(<ChatBot lang="id" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  // PENJELASAN TEST 2:
  // Memastikan interaksi user. Saat user mengklik tombol bundar tadi, 
  // komponen harus memanggil fungsi `setIsOpen(true)` yang berasal dari hook.
  it('calls setIsOpen when floating button is clicked', () => {
    const mockSetIsOpen = jest.fn();
    mockUseChat.mockReturnValue({
      ...defaultChatData,
      setIsOpen: mockSetIsOpen
    });

    render(<ChatBot lang="id" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Validasi bahwa fungsi pengubah state 'open' terpanggil
    expect(mockSetIsOpen).toHaveBeenCalled();
  });

  // PENJELASAN TEST 3:
  // Memastikan jika state `isOpen` bernilai TRUE, maka jendela chat (modal) muncul.
  // Kita mengecek apakah judul "Nihong AI" dan pesan sapaan dari bot sudah tampil di layar.
  it('renders chat window when isOpen is true', () => {
    mockUseChat.mockReturnValue({
      ...defaultChatData,
      isOpen: true
    });

    render(<ChatBot lang="id" />);
    
    // Mencari elemen teks di dalam modal chat
    expect(screen.getByText('Nihong AI')).toBeInTheDocument();
    expect(screen.getByText('Halo!')).toBeInTheDocument();
  });

  // PENJELASAN TEST 4:
  // Memastikan visual indikator "Typing..." (animasi titik-titik) muncul.
  // Ini penting agar user tahu bot sedang memproses jawaban (User Experience).
  // Kita menggunakan `data-testid` karena elemen ini berupa animasi SVG yang sulit dicari dengan teks.
  it('shows typing indicator when isTyping is true', () => {
    mockUseChat.mockReturnValue({
      ...defaultChatData,
      isOpen: true,
      isTyping: true
    });

    render(<ChatBot lang="id" />);
    const typingIndicator = screen.getByTestId('typing-indicator');
    expect(typingIndicator).toBeInTheDocument();
  });
});
