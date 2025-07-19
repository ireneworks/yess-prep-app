# Yess Frontend Test

### Get Started

1. Installation

```
$ npm install 
```

2. Starting the Project

```
$ npm start 
```

### Project Directory Structure

```
┌── src
│   ├── @types
│   │   ├── dto                 (Collection of Data Transfer Object types)
│   │   ├── model               (Collection of domain-specific types)
│   │   └── utility             (Collection of utility types)
│   ├── api
│   │   ├── config              (Files for managing Axios configurations)
│   │   └── [domain api]        (API logic called within domain-specific pages)
│   ├── assets                  (Collection of common images used globally)
│   ├── components              (Collection of common components used globally)
│   ├── hooks
│   ├── modules                 (Collection of utility functions unrelated to business logic)
│   ├── pages                   (Collection of components directly connected to react-router routes)
│   │   ├── [domain page]
│   │   │   └── components      (Collection of components used only within that page)
│   ├── services                (Collection of functions containing global business logic)
│   └── styles                  (Collection of common style variables used within each component)
```

### Dependencies

- react
- typescript
- styled-component
- axios
- react-router-dom
- lodash
- react-select
- react-infinite-scroll-component
- react-masonry-css
- prettier
