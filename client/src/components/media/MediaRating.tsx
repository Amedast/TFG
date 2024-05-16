export default function MediaRating ({ rating }: { rating: number }) {
  function getColor (rating: number) {
    if (rating <= 2.5) {
      return 'border-red-600 text-red-500'
    } else if (rating <= 5) {
      return 'border-orange-600 text-orange-500'
    } else if (rating <= 6.5) {
      return 'border-yellow-600 text-yellow-500'
    } else if (rating <= 7.5) {
      return 'border-lime-600 text-lime-500'
    } else if (rating < 9) {
      return 'border-green-600 text-green-500'
    } else {
      return 'border-green-700 text-green-600'
    }
  }
  const colorClass = getColor(rating)
  return (
    <div
      className={`border bg-background py-1 p-2 rounded-sm w-fit mt-1 ${colorClass}`}
    >
      <span className='font-semibold'>{rating.toFixed(1)}</span>
    </div>
  )
}
