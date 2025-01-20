import './tracking.css'
import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'

function Tracking() {
  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [createViewDay, createViewMonthAgenda, createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2025-01-19 10:00',
        end: '2025-01-19 12:00',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2025-01-18 13:00',
        end: '2025-01-18 14:00',
      }
    ],
    plugins: [eventsService]
  })

  useEffect(() => {
    // get all events
    eventsService.getAll()
  }, [])
  return (
    <div className='mt-4  '>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default Tracking