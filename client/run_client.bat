@echo off
echo Starting PlaySonic Client...
echo.
echo Installing dependencies...
call uv sync
call uv pip install fluent.runtime
echo.
echo Launching...
uv run python client.py
pause

