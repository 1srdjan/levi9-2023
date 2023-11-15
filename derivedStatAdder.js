const fs = require('fs');
const func = () => {
fs.readdir('./players', function (err, list) {
    for (var i = 0; i < list.length; i++) {
        let fileName = `./players/${list[i]}`;
        let stats = require(fileName);

        games = stats["gamesPlayed"]
        let trad = "traditional", ft = "freethrows", atp = "attempts", md = "made", twop = "twoPoints", trp = "threePoints";
        /////////////////
        let adv = "advanced";
        stats[adv] = {};
        stats[adv]["valorization"] = 0;
        stats[adv]["effectiveFieldGoalPercentage"] = 0;
        stats[adv]["trueShootingPercentage"] = Math.round((stats[trad]["points"] / (2 * (stats[trad][twop][atp] + stats[trad][trp][atp] + 0.475 * stats[trad][ft][atp])) * 100) * 10) / 10;
        stats[adv]["hollingerAssistRatio"] = Math.round((stats[trad]["assists"] / (stats[trad][twop][atp] + stats[trad][trp][atp] + 0.475 * stats[trad][ft][atp] + stats[trad]["assists"] + stats[trad]["turnovers"]) * 100) * 10) / 10;
        
        stats[trad][ft]["shootingPercentage"] = Math.round((stats[trad][ft][md] / stats[trad][ft][atp] * 100) * 10) / 10;
        stats[trad][ft][atp] = Math.round((stats[trad][ft][atp] / games) * 10) / 10;
        stats[trad][ft][md] = Math.round((stats[trad][ft][md] / games) * 10) / 10;
        
        stats[trad][twop]["shootingPercentage"] = Math.round((stats[trad][twop][md] / stats[trad][twop][atp] * 100) * 10) / 10;
        stats[trad][twop][atp] = Math.round((stats[trad][twop][atp] / games) * 10) / 10;
        stats[trad][twop][md] = Math.round((stats[trad][twop][md] / games) * 10) / 10;
        
        stats[trad][trp]["shootingPercentage"] = Math.round((stats[trad][trp][md] / stats[trad][trp][atp] * 100) * 10) / 10;
        stats[trad][trp][atp] = Math.round((stats[trad][trp][atp] / games) * 10) / 10;
        stats[trad][trp][md] = Math.round((stats[trad][trp][md] / games) * 10) / 10;
        
        stats[trad]["points"] = Math.round((stats[trad]["points"] / games) * 10) / 10;
        stats[trad]["rebounds"] = Math.round((stats[trad]["rebounds"] / games) * 10) / 10;
        stats[trad]["blocks"] = Math.round((stats[trad]["blocks"] / games) * 10) / 10;
        stats[trad]["assists"] = Math.round((stats[trad]["assists"] / games) * 10) / 10;
        stats[trad]["steals"] = Math.round((stats[trad]["steals"] / games) * 10) / 10;
        stats[trad]["turnovers"] = Math.round((stats[trad]["turnovers"] / games) * 10) / 10;
        
        let all = stats[trad]["points"] + stats[trad]["rebounds"] + stats[trad]["blocks"] + stats[trad]["assists"] + stats[trad]["steals"];
        let allneg = stats[trad][ft][atp] - stats[trad][ft][md] + stats[trad][twop][atp] - stats[trad][twop][md] + stats[trad][trp][atp] - stats[trad][trp][md] + stats[trad]["turnovers"];
        
        stats[adv]["valorization"] = Math.round((all - allneg) * 10) / 10;
        stats[adv]["effectiveFieldGoalPercentage"] = Math.round(((stats[trad][twop][md] + 1.5 * stats[trad][trp][md]) / (stats[trad][twop][atp] + stats[trad][trp][atp]) * 100) * 10) / 10;

        fs.writeFileSync(fileName, JSON.stringify(stats, null, 2));
    }
})
}
exports.derivedStats = func;