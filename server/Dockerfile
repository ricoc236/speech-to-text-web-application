FROM node:18


WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 python3-pip python3-venv ffmpeg && \
    rm -rf /var/lib/apt/lists/*

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"


COPY package*.json ./
RUN npm install


COPY . .


RUN pip install --no-cache-dir -r asrModel/requirements.txt

EXPOSE 3001

CMD ["node", "src/server.js"]