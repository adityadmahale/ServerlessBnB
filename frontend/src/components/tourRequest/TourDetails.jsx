import { useLocation } from 'react-router-dom'

function TourDetails() {
  const {
    state: { tourPackages },
  } = useLocation()

  const { Alpha, Beta, Gamma } = tourPackages
  return (
    <>
      <h3>Tour Packages</h3>

      <p>
        <strong>Alpha Tour</strong> - Recommendation Score -{' '}
        {(+Alpha * 100).toFixed(2)}%
      </p>

      <p>
        <strong>Beta Tour</strong> - Recommendation Score -{' '}
        {(+Beta * 100).toFixed(2)}%
      </p>

      <p>
        <strong>Gamma Tour</strong> - Recommendation Score -{' '}
        {(+Gamma * 100).toFixed(2)}%
      </p>
    </>
  )
}
export default TourDetails
