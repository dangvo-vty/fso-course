import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('render content', () => {
  const blog = {
    title: 'ABC1',
    author: 'Dang'
  }

  render(<Blog blog={ blog }/>)

  const element = screen.findByText('ABC1')
  expect(element).toBeDefined()
})

test('clicked ', async () => {
  const blog = {
    title: 'ABC1',
    author: 'Dang',
    url: 'cac.com',
    likes: 0
  }

  const mockHandler = vi.fn()

  render(<Blog blog={ blog }/>)

  const user = userEvent.setup()
  const button = screen.findByText('View')
  user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(0)

})