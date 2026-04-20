import { render } from '@testing-library/react';
import { renderText } from '../textUtils';

describe('textUtils', () => {
  describe('renderText', () => {
    it('should return simple text as spans', () => {
      const text = 'Hello world';
      const { container } = render(<>{renderText(text)}</>);
      expect(container.textContent).toBe('Hello world');
      expect(container.querySelectorAll('a')).toHaveLength(0);
      expect(container.querySelectorAll('span')).toHaveLength(1);
    });

    it('should convert a URL into a clickable link', () => {
      const text = 'Check out https://google.com for more info';
      const { container } = render(<>{renderText(text)}</>);
      
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://google.com');
      expect(link).toHaveTextContent('https://google.com');
      expect(container.textContent).toContain('Check out ');
      expect(container.textContent).toContain(' for more info');
    });

    it('should strip trailing punctuation from URL', () => {
      const text = 'Go to https://example.com, it is a great site!';
      const { container } = render(<>{renderText(text)}</>);
      
      const link = container.querySelector('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(container.textContent).toContain(',');
    });

    it('should handle multiple URLs in the same text', () => {
      const text = 'Links: https://site1.com and http://site2.org.';
      const { container } = render(<>{renderText(text)}</>);
      
      const links = container.querySelectorAll('a');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('href', 'https://site1.com');
      expect(links[1]).toHaveAttribute('href', 'http://site2.org');
      expect(container.textContent).toContain(' and ');
      expect(container.textContent).toContain('.');
    });
  });
});
