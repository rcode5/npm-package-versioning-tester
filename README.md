# npm-package-versioning-tester
NPM Package to test versioning strategies and dist-tags and see how `npm install my-package --tag whatever` may differ from `npm install my-package@whatever`

## problem statement

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

This appears to happen *after* you've added the base package.  For example, in `the-includer` subpackage,
we did:
```
npm add rcode5-package-versioning-tester

+ rcode5-package-versioning-tester@1.1.0
```

At this point, v2.0.0 is the last pre-release version, but v1.2.1 has also been
tagged as prerelease (as well as all the canary versions.

Then try some npm installs

```
npm install rcode5-package-versioning-tester --dry-run --tag prerelease
+ rcode5-package-versioning-tester@1.2.1

npm install rcode5-package-versioning-tester --dry-run
+ rcode5-package-versioning-tester@1.1.0

npm install rcode5-package-versioning-tester@prerelease --dry-run
+ rcode5-package-versioning-tester@2.0.0
```

What I read from this is that with `--tag prerelease` it seems to be picking up the first non-canary version which has (in the past) had the pre-release tag.  Or maybe this is just doing a standard `npm install` where it's upgrading to the nearest matching version (because `the-includer/package.json` has     "rcode5-package-versioning-tester": "^1.1.0").

It feels a little weird.
