require(`@testing-library/jest-dom/extend-expect`)
global.open = jest.fn()
global.FB = jest.fn()
global.omTrackShare = jest.fn()