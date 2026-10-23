'use client';

export default function OnayliForm({ action, soru, children, className }) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(e) => {
        if (!window.confirm(soru)) e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
