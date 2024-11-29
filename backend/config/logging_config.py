import logging
import logging.handlers
import os
from datetime import datetime

# Create logs directory if it doesn't exist
LOGS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)

def setup_logging(app_name='workflow-canvas'):
    """Configure logging for the application."""
    
    # Create formatters
    detailed_formatter = logging.Formatter(
        '%(asctime)s | %(levelname)-8s | %(name)s | %(filename)s:%(lineno)d | %(message)s'
    )
    
    simple_formatter = logging.Formatter(
        '%(asctime)s | %(levelname)-8s | %(message)s'
    )

    # Create handlers
    # 1. File handler for detailed debugging
    debug_file = os.path.join(LOGS_DIR, f'{app_name}-debug.log')
    debug_handler = logging.handlers.RotatingFileHandler(
        debug_file,
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    debug_handler.setLevel(logging.DEBUG)
    debug_handler.setFormatter(detailed_formatter)

    # 2. File handler for errors
    error_file = os.path.join(LOGS_DIR, f'{app_name}-error.log')
    error_handler = logging.handlers.RotatingFileHandler(
        error_file,
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(detailed_formatter)

    # 3. Console handler for general info
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(simple_formatter)

    # 4. Performance logging
    perf_file = os.path.join(LOGS_DIR, f'{app_name}-performance.log')
    perf_handler = logging.handlers.RotatingFileHandler(
        perf_file,
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    perf_handler.setLevel(logging.INFO)
    perf_handler.setFormatter(detailed_formatter)

    # Create loggers
    # Main application logger
    logger = logging.getLogger(app_name)
    logger.setLevel(logging.DEBUG)
    logger.addHandler(debug_handler)
    logger.addHandler(error_handler)
    logger.addHandler(console_handler)

    # Performance logger
    perf_logger = logging.getLogger(f'{app_name}.performance')
    perf_logger.setLevel(logging.INFO)
    perf_logger.addHandler(perf_handler)

    return logger, perf_logger

# Usage example:
# logger, perf_logger = setup_logging()
# logger.debug("Debug message")
# logger.info("Info message")
# logger.error("Error message")
# perf_logger.info("Performance metric")
