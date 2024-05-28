import dotenv from 'dotenv'
dotenv.config()

export const apiBase = process.env.NEXT_PUBLIC_API_URL as string

export const HeaderItems = [
  {
    title: 'Películas',
    popover: true,
    popoverItems: [
      {
        label: 'Populares',
        url: '/movies/search?sort=popular'
      },
      {
        label: 'Mejor Valoradas',
        url: '/movies/search?sort=top_rated'
      },
      {
        label: 'Próximamente',
        url: '/movies/search?sort=upcoming'
      }
    ]
  },
  {
    title: 'Series',
    popover: true,
    popoverItems: [
      {
        label: 'Populares',
        url: '/series/search?sort=popular'
      },
      {
        label: 'Mejor Valoradas',
        url: '/series/search?sort=top_rated'
      },
      {
        label: 'Próximamente',
        url: '/series/search?sort=upcoming'
      }
    ]
  },
  {
    title: 'Explora',
    popover: false,
    popoverItems: [],
    url: '/filter'
  }
]
