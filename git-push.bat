
@echo off
 
title GIT push bat
color 3
echo now file path：%cd%
echo;
 
echo git add .
git add .
echo;
 
set /p declation=commit message
git commit -m "%declation%"
echo;
 
echo git pull origin main
git pull origin main
echo;

echo git push origin main
git push origin main
echo;
 
echo success
echo;
 
pause

@REM ————————————————
@REM 版权声明：本文为CSDN博主「仲夏宁叶香」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
@REM 原文链接：https://blog.csdn.net/M82_A1/article/details/108350356