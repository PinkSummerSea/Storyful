import { trendData } from '../../fakeData/trendData'
import './TrendCard.css'

const TrendCard = () => {
  return (
    <div className="TrendCard">
        <h3>Trends for you</h3>
        {trendData.map((trend, i) => {
            return(
                <div className='trend' key={i}>
                    <span>#{trend.name}</span>
                    <span>#{trend.shares}k shares</span>
                </div>
            )
        })}
    </div>
  )
}

export default TrendCard