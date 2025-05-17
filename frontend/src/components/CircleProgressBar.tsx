import React from 'react'

interface CircleProgressBarProps {
  progress: number
  size?: number
  strokeWidth?: number
  backgroundColor?: string
  progressColor?: string
  textColor?: string
  displayText?: string
}

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
  progress,
  size = 60,
  strokeWidth = 5,
  backgroundColor = 'var(--color-primary-deepforest)',
  progressColor = 'var(--color-amber)',
  textColor = 'var(--color-white)',
  displayText
}) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100)
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference

  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.25,
          color: textColor
        }}
      >
        {displayText || `${Math.round(normalizedProgress)}%`}
      </div>
    </div>
  )
}

export default CircleProgressBar