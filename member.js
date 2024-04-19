function skillsMember() {
    // Get the member's skills
    var member = getMember();
    var skills = member.getSkills();
    return skills;
    }