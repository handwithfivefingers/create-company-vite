import { describe, test } from 'vitest'
import { render } from '@/test/test-utils'
import App from './App'
describe('App Screen', () => {
  test('Should rendered', () => {
    render(<App />)
  })
})
