@echo off

set nvm_version=%NVM_HOME%
set desired_version=%~dp0\.nvmrc

# Check if nvm is installed
if "%nvm_version%"=="" (
    echo NVM is not installed. Please install it first.
    exit 1
)

# Check if the desired version is installed
for /f "tokens=*" %%a in ('nvm ls ^| findstr "%desired_version%"') do (
    set found=1
)
if not defined found (
    echo Installing Node version %desired_version%...
    nvm install %desired_version%
) else (
    echo Node version %desired_version% already installed.
)

# Set the desired version for the current shell
nvm use %desired_version%
