import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { useMemo } from 'react'
import '@schedule-x/theme-default/dist/index.css'
import formatDate from '../../../../utils/FormDate'

// Hàm xác định màu của sự kiện (đưa lên trên để tránh lỗi)
const getEventColor = (vaccine) => {
    if (vaccine.status === 'completed') return '#22c55e'
    if (vaccine.status === 'scheduled') return '#3b82f6'
    return '#6b7280'
}

function CalendarApp({ setIsOpen, sortedVaccines }) {
    // Xử lý danh sách sự kiện từ vaccine
    const eventsSorted = useMemo(() => {
        return sortedVaccines.map(vaccine => ({
            id: vaccine.id.toString(),
            title: vaccine.name,
            start: formatDate(vaccine.minimumIntervalDate),
            end: formatDate(vaccine.dueDate),
            allDay: true,
            color: getEventColor(vaccine)
        }))
    }, [sortedVaccines])

    // Tạo eventsService chỉ một lần
    const eventsService = useMemo(() => createEventsServicePlugin({ initialEvents: eventsSorted }), [eventsSorted])

    const calendar = useCalendarApp({
        defaultView: 'month-grid',
        views: [
            createViewMonthGrid(),
            createViewWeek(),
            createViewDay(),
            createViewMonthAgenda()
        ],
        events: eventsSorted,
        plugins: [eventsService],
        translations: {
            navigation: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                today: 'Today'
            }
        },
        dateFormat: {
            month: 'long',
            week: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
    })

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Vaccination Calendar</h2>
                <button
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                    Back to List
                </button>
            </div>
            <div className="h-[600px]">
                <ScheduleXCalendar calendarApp={calendar} />
            </div>
        </div>
    )
}

export default CalendarApp
