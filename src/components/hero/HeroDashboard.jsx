import { actions, spendingBars, stats } from '../../data/content';

export default function HeroDashboard() {
  return <>
    <div className="ui-card">
      <div className="ui-header">
        <div className="user-info">
          <div className="avatar" aria-hidden="true" />
          <div className="user-text"><h4>Welcome back, William</h4><p>Premium User</p></div>
        </div>
        <div className="settings-icon" aria-hidden="true">⚙️</div>
      </div>
      <div className="balance-label">Available Balance</div>
      <div className="balance-amount">$12,480.50</div>
      <div className="stats-grid">
        {stats.map(stat => <div className="stat-box" key={stat.label}><h5>{stat.label}</h5><p>{stat.value}</p></div>)}
      </div>
      <div className="action-grid">
        {actions.map(action => <div className="action-btn" key={action.label}>
          <span className="action-icon">{action.icon}</span><span className="action-text">{action.label}</span>
        </div>)}
      </div>
    </div>
    <div className="chart-card">
      <div className="chart-header"><h5>Weekly Spendings</h5><button type="button">Share</button></div>
      <div className="bar-chart" role="img" aria-label="Weekly spending bars: 40, 70, 50, 90, 60, 80, and 45 percent">
        {spendingBars.map((height, index) => <div className="bar" key={index} style={{ height: `${height}%` }} />)}
      </div>
    </div>
  </>;
}
