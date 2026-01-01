export const TribalOverlays = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Maasai Beadwork Pattern */}
      <div className="absolute inset-0 tribal-maasai opacity-30" />

      {/* Basket Weaving Pattern */}
      <div className="absolute inset-0 tribal-basket opacity-20" />

      {/* Beadwork Dots */}
      <div className="absolute inset-0 tribal-beadwork opacity-25" />
    </div>
  );
};
