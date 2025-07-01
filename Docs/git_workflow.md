1. Create a feature branch.
2. Keep pulling and rebasing the changes from the main/base-branch cmd : git pull --rebase
3. Once done with my features, squash all commit to one
4. Merge the features branch into main

Before rebase:
main: A---B---C
feature: \---D---E

After rebase:
main: A---B---C
feature: D'---E'
