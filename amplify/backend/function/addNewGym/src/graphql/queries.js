export const getRegion = /* GraphQL */ `
  query GetRegion($id: ID!) {
    getRegion(id: $id) {
      id
      superRegionID
      name
      createdAt
      updatedAt
    }
  }
`;
