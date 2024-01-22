--Create Apikeys Table
CREATE TABLE IF NOT EXISTS apikeys ( id SERIAL PRIMARY KEY, wsid VARCHAR(100), apikey VARCHAR(100));

--Create Tasks Table
CREATE TABLE IF NOT EXISTS taskids ( id SERIAL PRIMARY KEY, wsid VARCHAR(100), listid VARCHAR(100), taskids VARCHAR(100));

--Create List Table
CREATE TABLE IF NOT EXISTS listids ( id SERIAL PRIMARY KEY, wsid VARCHAR(100), folderid VARCHAR(100), listid VARCHAR(100));

-- Create Folderids table
CREATE TABLE IF NOT EXISTS folderids ( id SERIAL PRIMARY KEY, wsid VARCHAR(100), spaceid VARCHAR(100), folderid VARCHAR(100));

--Create Spaceid table
CREATE TABLE IF NOT EXISTS spaceids ( id SERIAL PRIMARY KEY, wsid VARCHAR(100), spaceid VARCHAR(100));