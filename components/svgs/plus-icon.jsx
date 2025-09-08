const PlusIcon = ({ color = 'white', width = 41, height = 41 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M20 21V34H22V21L34 21V19L22 19V7H20V19H7L7 21H20Z" fill={color} />
    </svg>
  );
};

export default PlusIcon;
