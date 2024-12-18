<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

    class User extends Authenticatable
    {
        use HasApiTokens, HasFactory, Notifiable;

        /**
         * The attributes that are mass assignable.
         *
         * @var array<int, string>
         */
        protected $fillable = [
            'name',
            'email',
            'password',
        ];

        /**
         * The attributes that should be hidden for serialization.
         *
         * @var array<int, string>
         */
        protected $hidden = [
            'password',
            'remember_token',
        ];

        /**
         * The attributes that should be cast.
         *
         * @var array<string, string>
         */
        protected $casts = [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];

        public function isAdmin()
        {
            return $this->role === 'admin';
        }

        public function isUser()
        {
            return $this->role === 'user';
        }

        protected static function booted()
        {
            static::created(function ($user) {
                Korpa::create(['user_id' => $user->id]);
            });
        }
    
        public function korpa()
        {
            return $this->hasOne(Korpa::class);
        }

        public function narudzbina()
        {
            return $this->hasMany(Narudzbina::class, 'user_id');
        }

        public function statistikeKorpe()
        {
            return $this->hasMany(StatistikaKorpe::class);
        }


    }

