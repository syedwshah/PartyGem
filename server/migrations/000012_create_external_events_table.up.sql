CREATE TABLE external_events (
    external_event_id INT AUTO_INCREMENT PRIMARY KEY,
    external_source VARCHAR(255),
    event_name VARCHAR(255),
    event_description TEXT,
    event_date TIMESTAMP,
    venue VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
