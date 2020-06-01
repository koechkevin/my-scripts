# K3v Scripts

I got tired of creating files each and every time when generating a new component. I had to make an helper script to make it easy for me.

create a React component folder with typescript (material UI template)

- name.tsx
- name.interface.ts
- name.styles.ts
- index.ts exporting modules beneath

```shell script
new-component name --target=$folder
```

I had some components set up using Create React App but I now needed them published to npm to reuse the components in another application.
 
Convert Create React App --template=typescript application to npm package

- No need for a separate `npm i @types/package`
- Typescript support
- Update package version on every commit. This was very important for my automatic publish with Circle Ci.

```shell script
cra-package
```
