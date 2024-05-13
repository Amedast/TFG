export default async function MediaRating ({ rating }: { rating: number }) {
  function getColor (rating: number) {
    if (rating <= 2.5) {
      return 'border-red-600 text-red-500' // Rojo para bajos ratings
    } else if (rating <= 5) {
      return 'border-orange-600 text-orange-500' // Naranja para ratings intermedios bajos
    } else if (rating <= 6.5) {
      return 'border-yellow-600 text-yellow-500' // Amarillo para ratings medios
    } else if (rating <= 7.5) {
      return 'border-lime-600 text-lime-500'
    } else if (rating < 9) {
      return 'border-green-600 text-green-500' // Verde claro para ratings intermedios altos
    } else {
      return 'border-green-700 text-green-600' // Verde oscuro para ratings altos
    }
  }
  const colorClass = getColor(rating)
  return (
    <div
      className={`border border-secondary bg-background py-1 p-2 rounded-sm w-fit mt-1 ${colorClass}`}
    >
      <span className='font-semibold'>{rating.toFixed(1)}</span>
    </div>
  )
}
