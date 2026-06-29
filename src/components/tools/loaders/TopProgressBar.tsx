export const TopProgressBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-[999] h-1 overflow-hidden bg-transparent">
      <div className="h-full w-1/3 bg-white animate-[top-progress-bar_1.1s_ease-in-out_infinite] motion-reduce:animate-none" />
    </div>
  );
};
