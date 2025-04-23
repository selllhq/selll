<?php

app()->post('/waitlist', 'Waitlist\JoinController@handle');
app()->post('/admin/waitlist/invite', 'Waitlist\InvitesController@handle');
