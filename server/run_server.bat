@echo off
echo Starting PlaySonic Server...
echo.
uv sync
uv run python main.py
pause

