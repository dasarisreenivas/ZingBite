$libJars = Get-ChildItem "C:\Users\HP\eclipse-workspace\.metadata\.plugins\org.eclipse.wst.server.core\tmp0\wtpwebapps\zingbite\WEB-INF\lib\*.jar" | ForEach-Object { $_.FullName }
$targetClasses = "d:\ZingBite\zingbite\target\classes"
$resources = "d:\ZingBite\zingbite\src\main\resources"
$classpath = ($libJars + $targetClasses + $resources) -join ";"

& "C:\Program Files\Java\jdk-25.0.2\bin\java.exe" -cp $classpath com.app.zingbiteutils.DatabaseIndexInitializer
