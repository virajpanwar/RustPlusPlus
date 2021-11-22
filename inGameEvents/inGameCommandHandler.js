const Timer = require('../util/timer');

module.exports = {
    inGameCommandHandler: function (rustplus, client, command) {
        const prefix = '!';

        if (command.startsWith(prefix + 'alarm')) {
            module.exports.commandAlarm(rustplus, command);
        }
        else if (command === (prefix + 'bradley')) {
            module.exports.commandBradley(rustplus);
        }
        else if (command.startsWith(prefix + 'leader')) {
            module.exports.commandLeader(rustplus, command);
        }
        else if (command === (prefix + 'pop')) {
            module.exports.commandPop(rustplus);
        }
        else if (command === (prefix + 'time')) {
            module.exports.commandTime(rustplus);
        }
        else if (command === (prefix + 'wipe')) {
            module.exports.commandWipe(rustplus);
        }
    },

    commandAlarm: function (rustplus, command) {
        console.log('ALARM');
    },

    commandBradley: function (rustplus) {
        console.log('BRADLEY');
    },

    commandLeader: function (rustplus, command) {
        console.log('LEADER');
    },

    commandPop: function (rustplus) {
        rustplus.getInfo((msg) => {
            if (msg.response.hasOwnProperty('info')) {
                const now = msg.response.info.players;
                const max = msg.response.info.maxPlayers;
                const queue = msg.response.info.queuedPlayers;

                let str = `Population: (${now}/${max}) players`;

                if (queue !== 0) {
                    str += ` and ${queue} players in queue.`;
                }

                rustplus.sendTeamMessage(str);
                rustplus.log(str);
            }
        });
    },

    commandTime: function (rustplus) {
        rustplus.getTime((msg) => {
            if (msg.response.hasOwnProperty('time')) {
                const time = Timer.convertToHoursMinutes(msg.response.time.time);

                let str = `Current in-game time: ${time}.`;

                rustplus.sendTeamMessage(str);
                rustplus.log(str);
            }
        });
    },

    commandWipe: function (rustplus) {
        rustplus.getInfo((msg) => {
            if (msg.response.hasOwnProperty('info')) {
                const wipe = new Date(msg.response.info.wipeTime * 1000);
                const now = new Date();

                const sinceWipe = Timer.secondsToFullScale((now - wipe) / 1000);

                let str = `${sinceWipe} since wipe.`;

                rustplus.sendTeamMessage(str);
                rustplus.log(str);
            }
        });
    },
};