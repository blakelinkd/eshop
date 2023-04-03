export {}
describe('schedule API', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('should return a single schedule when GET is called with an ID', () => {
      cy.request('GET', '/api/schedules/1')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.id).to.eq(1)
        })
    })
  
    it('should update a schedule when PUT is called with an ID and updated data', () => {
      cy.request('PUT', '/api/schedules/1', {
        startDate: '2023-04-01T12:00:00.000Z',
        endDate: '2023-04-15T12:00:00.000Z'
      })
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.id).to.eq(1)
          expect(response.body.startDate).to.eq('2023-04-01T12:00:00.000Z')
          expect(response.body.endDate).to.eq('2023-04-15T12:00:00.000Z')
        })
    })
  
    it('should delete a schedule when DELETE is called with an ID', () => {
      cy.request('DELETE', '/api/schedules/1')
        .then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.id).to.eq(1)
        })
    })
  })
  