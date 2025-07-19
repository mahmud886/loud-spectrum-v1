import { Link } from '@/i18n/navigation';

/**
 * HashLink component that properly handles hash navigation in Next.js
 * @param {Object} props - Component props
 * @param {string} props.href - The href with hash (e.g., "/page#section")
 * @param {React.ReactNode} props.children - Child components
 * @param {Function} props.onClick - Optional onClick handler
 * @param {string} props.className - CSS classes
 * @param {Object} props.rest - Other props to pass to Link
 */
const HashLink = ({ href, children, onClick, className, ...rest }) => {
  const handleClick = (e) => {
    // Check if href contains a hash
    if (href.includes('#')) {
      e.preventDefault();
      if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    }

    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
};

export default HashLink;
