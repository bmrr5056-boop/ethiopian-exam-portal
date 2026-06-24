
# የሰራኸውን ለውጥ ከስልክህ ወደ Termux መልሰህ ለማምጣት
cp -r /sdcard/ethiopian-exam-portal/* ~/ethiopian-exam-portal/

# ወደ ፎልደሩ ለመግባት
cd ~/ethiopian-exam-portal

# ወደ GitHub ለመጫን
git add .
git commit -m "Update server logic via file manager"
git push

