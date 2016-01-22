var fs = require('fs');
var jade = require('jade');
var utils = require('jsonresume-themeutils');
var moment = require('moment');

require('./moment-precise-range.js');

utils.setConfig({ date_format: 'MMM, YYYY' });


function interpolate(object, keyPath) {
  var keys = keyPath.split('.');

  var obj = object;
  return keys.every(function (key) {
    obj = obj[key];
    return obj != null && obj != undefined;
  });
}

function capitalize(str) {
  if (str) {
    str = str.toString();
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  return str;
}

function getFloatingNavItems(resume) {
  var floating_nav_items = [
    {label: 'About', target: 'about', icon: 'board', requires: 'basics.summary'},
    {label: 'Work Experience', target: 'work-experience', icon: 'office', requires: 'work'},
    {label: 'Skills', target: 'skills', icon: 'tools', requires: 'skills'},
    {label: 'Education', target: 'education', icon: 'graduation-cap', requires: 'education'},
    {label: 'Awards & Activities', target: 'awards', icon: 'trophy', requires: 'awards'},
    {label: 'Volunteer Work', target: 'volunteer-work', icon: 'child', requires: 'volunteer'},
    {label: 'Projects', target: 'publications', icon: 'newspaper', requires: 'publications'},
    {label: 'Interests', target: 'interests', icon: 'heart', requires: 'interests'},
    {label: 'References', target: 'references', icon: 'thumbs-up', requires: 'references'}
  ];

  return floating_nav_items.filter(function(item) {
    var value = interpolate(resume, item.requires);
    return value
  });
}

function render(resume) {
  // Get url of picture
  resume.basics.picture = utils.getUrlForPicture(resume);

  // Compute location string
  addressValues = [];
  ['address', 'city', 'region', 'countryCode', 'postalCode'].forEach(function (key) {
    if (resume.basics.location[key]) {
      addressValues.push(resume.basics.location[key]);
    }
  });
  resume.basics.computed_location = addressValues.join(', ');

  // Compute languages string
  if (resume.languages) {
    languageValues = [];
    resume.languages.forEach(function(obj) {
      if (obj.language) {
        languageValues.push(obj.language);
      }
    });
    resume.basics.languages = languageValues.join(', ')
  }

  // Normalize network profiles
  if (resume.basics.profiles) {
    resume.basics.profiles.forEach(function(profile) {
      profile.label = profile.network.toLowerCase();
      profile.url = utils.getUrlForProfile(resume, profile.label);
    });
  }

  // Organize network profiles into top five and the rest
  resume.basics.top_five_profiles = resume.basics.profiles.slice(0, 5);
  resume.basics.remaining_profiles = resume.basics.profiles.slice(5);


  // Format work experiences
  if (resume.work) {
    resume.work.forEach(function(work) {
      var start_date = moment(work.startDate);
      var end_date = work.endDate;


      if (end_date) {
        work.endDate = utils.getFormattedDate(end_date);
        end_date = moment(end_date);
      }
      else {
        work.endDate = "Present";
        end_date = moment();
      }

      if (start_date) {
        work.startDate = utils.getFormattedDate(start_date);
        work.duration = moment.preciseDiff(start_date, end_date);
      }
    });
  }

  // Format skills
  if (resume.skills) {
    var levels = ['Beginner', 'Intermediate', 'Advanced', 'Master'];
    resume.skills.forEach(function(skill) {
      if (skill.level) {
        skill.skill_class = skill.level.toLowerCase();
        skill.level = capitalize(skill.level.trim());
        skill.display_progress_bar = levels.some(function(lvl) { return lvl == skill.level ? true : false });
      }
    });
  }

  // Format education dates
  if (resume.education) {
    resume.education.forEach(function(education){
      if (education.startDate) {
        education.startDate = utils.getFormattedDate(education.startDate);
      }
      if (education.endDate) {
        education.endDate = utils.getFormattedDate(education.endDate);
      }
    });
  }

  // Format award dates
  if (resume.awards) {
    resume.awards.forEach(function(award) {
      if (award.date) {
        award.date = utils.getFormattedDate(award.date, 'MMM DD, YYYY');
      }
    })
  }

  // Format volunteer dates
  if (resume.volunteer) {
    resume.volunteer.forEach(function(volunteer) {
      if (volunteer.startDate) {
        volunteer.startDate = utils.getFormattedDate(volunteer.startDate);
      }
      if (volunteer.endDate) {
        volunteer.endDate = utils.getFormattedDate(volunteer.endDate);
      }
    });
  }

  // Format publication dates
  if (resume.publications) {
    resume.publications.forEach(function(pub) {
      if (pub.releaseDate) {
        pub.releaseDate = utils.getFormattedDate(pub.releaseDate, 'MMM DD, YYYY');
      }
    });
  }

  return jade.renderFile(__dirname + '/jade/index.jade', {
    resume: resume,
    floating_nav_items: getFloatingNavItems(resume)
  });
}

module.exports = {
  render: render
};
