export type Recipe = {
  id: string
  title: string
  description: string
  servings: number
  prepMinutes: number
  cookMinutes: number
  ingredients: { item: string; qty?: string }[]
  steps: string[]
  tags: string[]
}
