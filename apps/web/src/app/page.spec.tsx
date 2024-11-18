import Home from './(homepage)/page';

describe('<Home />', () => {
  it('mounts', () => {
    cy.mount(<Home />);
  });
});
