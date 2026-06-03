# Publish this folder to GitHub Wiki

GitHub creates the wiki git repository **after the first wiki page is saved in the browser**.

## One-time setup (about 1 minute)

1. Open https://github.com/LetMeHelpYouREALTY/mesaskyeview.com/wiki  
2. Click **Create the first page** (or **New Page**)  
3. Title: `Home`  
4. Paste contents from [`Home.md`](Home.md) in this folder  
5. Click **Save Page**

## Push all pages from your machine

After step 5, the wiki git repo exists. From the project root:

```powershell
git clone https://github.com/LetMeHelpYouREALTY/mesaskyeview.com.wiki.git mesaskyeview.com-wiki
Copy-Item docs\wiki\*.md mesaskyeview.com-wiki\ -Exclude Publish-to-GitHub-Wiki.md -Force
cd mesaskyeview.com-wiki
git add -A
git commit -m "Sync wiki from docs/wiki"
git push origin master
```

Wiki URL: https://github.com/LetMeHelpYouREALTY/mesaskyeview.com/wiki

## Keep in sync

Edit files in `docs/wiki/` in the main repo, then repeat the copy/commit/push steps above (or edit directly on GitHub Wiki).
