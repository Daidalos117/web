<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    //fields that are ok to massive fill, white list
    protected  $fillable = ['comment', 'school_id'];

    //fields that are not ok to massive fill, black list
    protected $quarded = ['user_id'];
    
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'user_id');
    }
    
    
    static function schoolComments($schoolId) {
        return self::where('school_id', $schoolId)->get();
    }
    
}
