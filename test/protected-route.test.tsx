import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import ProtectedRoute from '../src/protected-route'
/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('ProtectedRoute is instantiable', () => {
    const wrapper = shallow(
      <ProtectedRoute
        role="admin"
        authorizations={{ admin: { authorizations: ['/admin'] } }}
        routeProps={{ path: '/admin', component: () => <span>hello</span> }}
      />
    )
    expect(wrapper).toBeDefined()
  })
})
