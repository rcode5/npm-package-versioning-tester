# npm-package-versioning-tester
NPM Package to test versioning strategies and dist-tags and see how `npm install my-package --tag whatever` may differ from `npm install my-package@whatever`

## problem statement

In a client project, I noticed the following oddity.

Assume we have a package called `my-package` with the following
versions sitting in the registry (and their corresponding npm dist-tags):

|version|dist-tag|
|-------|--------|
| 1.09.0 | latest |
| 1.11.0 | latest |
| 1.14.1-dev.4 | prerelease |
| 1.14.1-dev.6 | prerelease |
| 1.15.1-dev.4 | prerelease |
| 1.16.1 | prerelease |
| 1.19.1-dev.2 | prerelease |

All `prerelease` tagged versions were tagged using `lerna publish --tag <tag>`

With this in place, `npm info` returns the correct most recent versions with
 the correct `dist-tag`

```
dist-tags:
latest: 1.11.0                prerelease: 1.19.1-dev.2
```

But notice the difference between chosen versions when using `npm install` in different ways.

```
$ npm install $pkg --dry-run
+ my-package@1.11.0

$ npm install $pkg --dry-run --tag prerelease
+ my-package@1.16.1

$ npm install $pkg@prerelease --dry-run
+ my-package@1.19.1-dev.2
```
