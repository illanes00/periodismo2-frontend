'use client'

import { useEffect, useState } from 'react'

interface WeatherData {
  temperature: number
  windspeed: number
  weathercode: number
}

interface DailyForecast {
  day: string
  maxTemp: number
  minTemp: number
  weathercode: number
}

const WEATHER_DESCRIPTIONS: Record<number, { label: string; icon: string }> = {
  0: { label: 'Despejado', icon: 'sun' },
  1: { label: 'Parcialmente despejado', icon: 'sun' },
  2: { label: 'Parcialmente nublado', icon: 'cloud-sun' },
  3: { label: 'Nublado', icon: 'cloud' },
  45: { label: 'Niebla', icon: 'cloud' },
  48: { label: 'Niebla helada', icon: 'cloud' },
  51: { label: 'Llovizna leve', icon: 'rain' },
  53: { label: 'Llovizna', icon: 'rain' },
  55: { label: 'Llovizna intensa', icon: 'rain' },
  61: { label: 'Lluvia leve', icon: 'rain' },
  63: { label: 'Lluvia', icon: 'rain' },
  65: { label: 'Lluvia intensa', icon: 'rain' },
  71: { label: 'Nieve leve', icon: 'snow' },
  73: { label: 'Nieve', icon: 'snow' },
  75: { label: 'Nieve intensa', icon: 'snow' },
  80: { label: 'Chubascos leves', icon: 'rain' },
  81: { label: 'Chubascos', icon: 'rain' },
  82: { label: 'Chubascos intensos', icon: 'rain' },
  95: { label: 'Tormenta', icon: 'storm' },
  96: { label: 'Tormenta con granizo', icon: 'storm' },
  99: { label: 'Tormenta intensa', icon: 'storm' },
}

const SHORT_DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']

function WeatherIcon({ type, className }: { type: string; className?: string }) {
  const cls = className || 'h-8 w-8'
  if (type === 'sun') {
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    )
  }
  if (type === 'cloud-sun') {
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    )
  }
  if (type === 'cloud') {
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    )
  }
  if (type === 'rain') {
    return (
      <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 19v2m4-2v2m4-2v2" />
      </svg>
    )
  }
  // storm / snow / default
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m13 16-2 4m1-4-2 4" />
    </svg>
  )
}

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast?latitude=-33.45&longitude=-70.67&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&forecast_days=5&timezone=America/Santiago'

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<DailyForecast[]>([])

  useEffect(() => {
    fetch(FORECAST_URL)
      .then((r) => r.json())
      .then((d) => {
        if (d.current_weather) {
          setWeather({
            temperature: d.current_weather.temperature,
            windspeed: d.current_weather.windspeed,
            weathercode: d.current_weather.weathercode,
          })
        }
        if (d.daily?.time) {
          const days: DailyForecast[] = d.daily.time.map((t: string, i: number) => {
            const date = new Date(t + 'T12:00:00')
            return {
              day: SHORT_DAYS[date.getDay()],
              maxTemp: Math.round(d.daily.temperature_2m_max[i]),
              minTemp: Math.round(d.daily.temperature_2m_min[i]),
              weathercode: d.daily.weathercode[i],
            }
          })
          setForecast(days)
        }
      })
      .catch(() => {})
  }, [])

  if (!weather) return null

  const info = WEATHER_DESCRIPTIONS[weather.weathercode] || { label: 'N/A', icon: 'cloud' }

  return (
    <div className="rounded-xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900">
      {/* Current weather */}
      <div className="flex items-center gap-3 p-4">
        <div className="text-amber-500 dark:text-amber-400">
          <WeatherIcon type={info.icon} />
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              {Math.round(weather.temperature)}°
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">C</span>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{info.label}</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">Santiago</p>
        </div>
      </div>

      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <div className="flex border-t border-neutral-100 dark:border-neutral-800">
          {forecast.map((day, i) => {
            const dayInfo = WEATHER_DESCRIPTIONS[day.weathercode] || { icon: 'cloud' }
            return (
              <div
                key={i}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 ${i > 0 ? 'border-l border-neutral-100 dark:border-neutral-800' : ''}`}
              >
                <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500">
                  {i === 0 ? 'Hoy' : day.day}
                </span>
                <WeatherIcon type={dayInfo.icon} className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
                <div className="flex gap-1 text-[10px]">
                  <span className="font-semibold text-neutral-700 dark:text-neutral-300">{day.maxTemp}°</span>
                  <span className="text-neutral-400 dark:text-neutral-500">{day.minTemp}°</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Compact inline version for the ticker area */
export function WeatherInline() {
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-33.45&longitude=-70.67&current_weather=true')
      .then((r) => r.json())
      .then((d) => {
        if (d.current_weather) {
          setWeather({
            temperature: d.current_weather.temperature,
            windspeed: d.current_weather.windspeed,
            weathercode: d.current_weather.weathercode,
          })
        }
      })
      .catch(() => {})
  }, [])

  if (!weather) return null

  const info = WEATHER_DESCRIPTIONS[weather.weathercode] || { label: 'N/A', icon: 'cloud' }

  return (
    <span className="flex shrink-0 items-center gap-1.5">
      <WeatherIcon type={info.icon} className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
        {Math.round(weather.temperature)}°C
      </span>
      <span className="text-neutral-500 dark:text-neutral-400">Santiago</span>
    </span>
  )
}
