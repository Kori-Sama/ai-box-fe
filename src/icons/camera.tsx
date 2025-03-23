const Camera = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#000000"
      className={className}
    >
      <path d="m701-360-87-50 140-104 86 50-139 104ZM512-482l104-79-276-159-60 104 232 134Zm-64-119ZM160-160v-80h200v-238l-120-69q-29-17-37.5-48.5T211-656l60-104q17-29 48.5-37.5T380-789l381 220-244 182-77-44v191q0 33-23.5 56.5T360-160H160Z" />
    </svg>
  );
};
export default Camera;
