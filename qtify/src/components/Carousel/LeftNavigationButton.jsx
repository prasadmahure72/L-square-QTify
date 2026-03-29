function LeftNavigationButton({ className }) {
  return (
    <button className={className} aria-label="Previous">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#34C94B" />
        <path d="M21 11L14 18L21 25" stroke="#121212" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default LeftNavigationButton;
