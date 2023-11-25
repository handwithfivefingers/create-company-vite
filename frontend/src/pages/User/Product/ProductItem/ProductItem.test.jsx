import { describe, test } from 'vitest'
import { render } from '@/test/test-utils'
import UserProductItem from '.'

describe('App Screen', () => {
  test('Should rendered', () => {
    render(<UserProductItem />)
  })
})
