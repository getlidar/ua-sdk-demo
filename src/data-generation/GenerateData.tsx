export function randomize(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function generateEvent(event_type: string, event: object) {
  return {
    game_id: "",
    event_type: event_type,
    event: event
  }
}

export function createOnPageLand(code: string, provider: string) {
  return generateEvent("on_page_land", {
    "code": code,
    "provider": provider,
    "tag": "Helika",
  });
}

export function createOnRegister(wallet: string, email: string, provider: string) {
  return generateEvent("on_register", {
    "wallet": wallet,
    "email": email,
    "provider": provider,
    "tag": "Helika",
  });
}

export function createOnPurchase(wallet: string, nftId: number, provider: string) {
  return generateEvent("on_purchase", {
    "wallet": wallet,
    "nftId": nftId,
    "price": 10000000000,
    "denomination": "gwei",
    "token": "ETH",
    "chain-name": "arbitrum-nova",
    "chainId": "42170",
    "transaction": "0x562b9b3ff78fd791afa7011b703d80609cf228bf74afb8567e93c3ea2a7241b0",
    "provider": provider,
    "tag": "Helika",
  });
}

export function createOnDownload(provider: string) {
  return generateEvent("on_download", {
    "downloader": "win-x64.exe",
    "os": "windows",
    "provider": provider,
    "tag": "Helika",
  });
}

export function createSessionStart(identifier: string, walletAddress: string, sessionId: string, provider: string, timestamp: number) {
  let focusTime = randomize(100000, 1000000);
  let event = {
    "identifier": identifier,
    "provider": provider,
    "tag": "Lite",
    "sessionId": sessionId,
    "focusedTime": focusTime,
    "sessionTime": focusTime,
    "pathSequence": [
      {
        "path": "/",
        "timeEntered": timestamp
      },
      {
        "path": "/locker-room",
        "timeEntered": timestamp + 5000
      },
      {
        "path": "/imitation-learning",
        "timeEntered": timestamp + 10000
      }
    ],
    "walletAddress": walletAddress
  };
  return generateEvent("session_start", event);
}

export function createTutorial(identifier: string, sessionId: string, provider: string, timestamp: number) {
  let focusTime = randomize(10000, 1000000);
  let event = {
    "identifier": identifier,
    "provider": provider,
    "tag": "Lite",
    "sessionId": sessionId,
    "focusedTime": focusTime,
    "sessionTime": focusTime,
    "pathSequence": [
      {
        "path": "/tutorial",
        "timeEntered": timestamp
      },
      {
        "path": "/learning-grounds",
        "timeEntered": timestamp + 5000
      }
    ]
  };
  return generateEvent("tutorial", event);
}


export function createAiInspector(identifier: string, provider: string) {
  let focusTime = randomize(10000, 1000000);
  let id = randomize(0, 5000);
  let event = {
    "id": id,
    "identifier": identifier,
    "provider": provider,
    "tag": "Lite",
    "timeSpent": focusTime,
    "exitAction": "abrupt",
    "modelUpdateActions": [
      "update"
    ]
  };
  return generateEvent("ai inspector", event);
}

export function createLeaderboard(identifier: string, provider: string) {
  let focusTime = randomize(10000, 1000000);
  let id = randomize(0, 5000);
  let event = {
    "id": id,
    "identifier": identifier,
    "provider": provider,
    "tag": "Lite",
    "timeSpent": focusTime
  };
  return generateEvent("leaderboard", event);
}


export function createSimulation(identifier: string, provider: string) {
  let matchLength = randomize(1000, 10000);
  let fighterId = randomize(0, 250)
  let event = {
    "gameMode": "simulation",
    "stageName": "treasure",
    "fighterId1": fighterId,
    "fighterId2": -1,
    "winner": randomize(0, 1) === 1 ? fighterId : -1,
    "favouriteMove": "Uppercut Ground",
    "matchLength": matchLength,
    "killEfficiency": 0.97,
    "percentageTimeseries": {
      "you": [
        {
          "frame": 1,
          "percentage": 0
        },
      ],
      "opponent": [
        {
          "frame": 1,
          "percentage": 0
        },
      ]
    },
    "timeInAir": {
      "you": randomize(0, matchLength),
      "opponent": randomize(0, matchLength),
    },
    "provider": provider,
    "identifier": identifier,
    "opponent": "guppy",
    "tag": "Lite"
  };
  return generateEvent("simulation", event);
}

export function createTraining(identifier: string, provider: string, timestamp: number) {
  let event = {
    "id": randomize(0, 5000),
    "identifier": identifier,
    "provider": provider,
    "tag": "Lite",
    "elo": randomize(0, 5000),
    "stageName": "arena",
    "opponent": "dummy",
    "trainingType": "time",
    "endEarly": true,
    "abruptExit": false,
    "exitWithoutConfig": true,
    "timeBreakdown": {
      "collecting": [
        0
      ],
      "positioningOpponent": [
        563
      ],
      "playing": [
        592116
      ],
      "page": 620332
    },
    "numRetries": 0,
    "datapointsCollected": [
      1
    ],
    "timesToggledCollection": [
      0
    ],
    "timesToggledOpponent": [
      1
    ],
    "timePlaying": [
      {
        "start": timestamp,
        "end": timestamp + 5000
      }
    ],
    "timeCollecting": [
      []
    ],
    "timeSwitching": [
      [
        {
          "start": timestamp,
          "end": timestamp + 3000
        }
      ]
    ]
  };
  return generateEvent("training", event);
}

export function createJoinMatch(identifier: string, fighterId: number, provider: string) {
  let matchLength = randomize(1000, 10000);
  let fighterId2 = randomize(0, 5000);
  let playerElo = randomize(0, 5000);
  let oppElo = randomize(0, 5000);
  let winner = randomize(0, 1);
  let event = {
    "gameMode": "ranked",
    "matchId": "88-67-1692209417313",
    "stageName": "arena",
    "fighterId1": fighterId,
    "fighterId2": fighterId2,
    "winner": winner === 1 ? fighterId : fighterId2,
    "favouriteMove": "Punch Aerial",
    "matchLength": matchLength,
    "killEfficiency": 0.37,
    "percentageTimeseries": {
      "you": [
        {
          "frame": 1,
          "percentage": 0
        }
      ],
      "opponent": [
        {
          "frame": 1,
          "percentage": 0
        }
      ]
    },
    "timeInAir": {
      "you": randomize(0, matchLength),
      "opponent": randomize(0, matchLength),
    },
    "provider": provider,
    "identifier": identifier,
    "rank": {
      "you": randomize(0, 2000),
      "opponent": randomize(0, 2000) + 4,
    },
    "elo": {
      "youBefore": playerElo,
      "youAfter": winner === 1 ? playerElo + 10 : playerElo - 10,
      "opponentBefore": oppElo,
      "opponentAfter": winner === 0 ? oppElo + 10 : oppElo - 10,
    },
    "owner": {
      "you": identifier,
      "opponent": randomize(194000000000000000, 195000000000000000).toString()
    },
    "hasReplay": true,
    "tag": "Lite"
  };
  return generateEvent("join_match", event);
}

export function createAbandonMatch(identifier: string, fighterId: number, provider: string) {
  let id = randomize(0, 5000);
  let event = {
    "id": id,
    "identifier": identifier,
    "provider": provider,
    "tag": "Lite",
    "matchId": "88-67-1692209417313",
    "stageName": "arena",
    "fighterId1": fighterId,
  };
  return generateEvent("leaderboard", event);
}